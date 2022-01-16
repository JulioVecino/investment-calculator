<template>
  <div class="container">
    <div class="row justify-content-start">
      <div v-for="(item) in data" :key="item.symbol" class="col col-auto">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title"><b>{{item.name}} ({{item.symbol}})</b></h4>
          </div>
          <div class="card-body">
            <h5 class='card-text'>{{ Currency(item.price) }} USD</h5>
          </div>
        </div>
      </div>
    </div>
    <br>
      <div class="input-group has-validation">
        <span class="input-group-text">$</span>
        <input v-model.number="investment" type="number" placeholder="Monto a invertir ..." class="form-control" required />
        <button class='btn btn-primary' @click="Calculate()">Calcular inversión</button>
      </div>
      <div class="fst-italic" style="color:red" v-if="investmentErr">
        Porfavor introduzca un monto valido de inversión.
      </div>
      <br>
      <div v-if="projection['month'] && investmentErr === false" class="btn-group">
        <button @click="csvExport()" class="btn btn-outline-primary">Exportar a CSV</button>
        <button @click="jsonExport(projection)" class="btn btn-outline-primary">Exportar a JSON</button>
      </div>
     <br><br>
    <table class="table table-striped table-bordered" v-if="projection['month'] && investmentErr === false">
      <thead>
        <tr> <th colspan="8">INVERSION: <b>{{ Currency(investment) }} USD</b></th> </tr>
        <tr> <th colspan="4">Mensual</th><th colspan="4">Anual</th> </tr>
        <tr> <th colspan="2">BTC</th><th colspan="2">ETH</th><th colspan="2">BTC</th><th colspan="2">ETH</th> </tr>
      </thead>
      <tbody>
         <tr v-for="i in quantityPeriods" :key="i">
           <td>Mes {{i}}</td>
           <td>{{  Currency(projection['month']['BTC'][i-1].money) }} USD / {{ Decimal(projection['month']['BTC'][i-1].coin) }} BTC</td>
           <td>Mes {{i}}</td>
           <td>{{  Currency(projection['month']['ETH'][i-1].money) }} USD / {{ Decimal(projection['month']['BTC'][i-1].coin) }} ETH</td>

           <td>Año {{i}}</td>
           <td>{{  Currency(projection['year']['BTC'][i-1].money) }} USD / {{ Decimal(projection['year']['BTC'][i-1].coin) }} BTC</td>
           <td>Año {{i}}</td>
           <td>{{  Currency(projection['year']['ETH'][i-1].money) }} USD / {{ Decimal(projection['year']['ETH'][i-1].coin) }} ETH</td>
         </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Coins',
  methods: {
    /*
     *  Función para el Cálculo de la proyecciones mensual y Anual
     *  Descripción: Calcula las proyecciones partiendo de monto de inversión
     *      en periodos, criptomonedas definidas y la cantidad de periodos (12)
     *      Para la divisa en Dólares y su equivalente.
     */
    Calculate() {
      if ( Number.isNaN(this.investment) ||
          !this.investment ||
          this.investment < 0 ||
          !this.data ||
          this.data.length ===0
      ) {
        this.investmentErr = true;
        return
      }
      this.investmentErr = false;
      const keyPeriods = Object.keys(this.periods)
      this.projection = {}
      for(let k=0; k < keyPeriods.length; k++) {
        this.projection[keyPeriods[k]] = {}
        for (let i = 0; i < this.data.length; i++) {
          this.projection[keyPeriods[k]][this.data[i].symbol] = []
          for (let j = 0; j < this.quantityPeriods; j++) {
            const capital = j === 0 ? this.investment : this.projection[keyPeriods[k]][this.data[i].symbol][j - 1].money
            const money = capital + capital * ((1 + this.interest[this.data[i].symbol]) ** this.periods[keyPeriods[k]]-1)
            this.projection[keyPeriods[k]][this.data[i].symbol].push({
              money,
              coin: money / this.data[i].price
            })
          }
        }
      }
    },
    /*
     * Funcion de formateo de moneda en USD
     */
    Currency(value) {
      if (typeof value !== "number") {
        return value;
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    },
    /*
    * Funcion de formateo de decimales default 5
    */
    Decimal(value, decimals = 5) {
      if (typeof value !== "number") {
        return value;
      }
      return parseFloat(value).toFixed(decimals);
    },
    /*
     * Función de exportación a CSV las proyecciones
     */
    csvExport() {
      let csvContent = "data:text/csv;charset=utf-8,";
      const header = ['period','coin','item','amount','coinValue'];
      const period = Object.keys(this.periods)
      const coins = Object.keys(this.interest);
      const body = [header.join(";")]
      for(let k=0; k< period.length; k++) {
        for(let j=0; j < coins.length; j++) {
          for (let i = 0; i < this.quantityPeriods; i++) {
            body.push(
              [period[k], coins[j], i + 1, this.projection[period[k]][coins[j]][i].money, this.projection[period[k]][coins[j]][i].coin].join(';')
            )
          }
        }
      }
      csvContent += body.join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    },
    jsonExport(arrData) {
      let csvContent = "data:application/json;charset=utf-8,";
      csvContent += JSON.stringify(arrData);
      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.json");
      link.click();
    }
  },
  async setup() {
    const data = ref(null);
    const investmentErr = ref(false);
    const projection = ref({});

    data.value = await fetchData();
    setInterval(async () => {
      data.value = await fetchData();
    }, 10000);
    return { data,
      investment: null,
      investmentErr,
      quantityPeriods: 12,
      interest: { BTC: .05, ETH: .03 },
      periods: { month:1, year: 12 },
      projection
    };
  }
}
/*
 * Función de consulta al API solicitando el listado de Criptomonedas definida
 * salida:
 * [{
 *    name: 'Ethereum',
 *    symbol: 'ETH',
 *    price: 34569.89,
 * }]
 */
async function fetchData() {
  return fetch(`/api/coin-market-cap`)
    .then(res => res.json())
    .then(out => {
      console.log('Checkout this JSON! ', out)
      return out
    })
    .catch(err => console.log(err));
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
