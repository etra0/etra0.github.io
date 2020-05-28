const app = new Vue({
    el: '#app',
    data: {
        spec: [1, 2, 3],
        house: '',
        data: [],
    },
    created: function() {
        console.log("created");
        fetch('/blog/assets/images/altair/plot1.json')
            .then(response => response.json())
            .then(json => {
                this.spec = json;
                this.data = json.data.values;
                console.log(this.spec)

                const el = document.getElementById('vis');
                vegaEmbed("#vis", app.spec, {"mode": "vega-lite"})
                  .catch(error => showError(el, error));
                $(".vega-actions").hide();
            })

    },
    methods: { 
        redraw: () => {
            const el = document.getElementById('vis');
            let spec = app.spec;
            console.log(app.spec);
            spec.data.values = app.data;
            if (app.house != '')
                spec.data.values = app.data.filter(x => x.house.includes(app.house));
            vegaEmbed("#vis", spec, {"mode": "vega-lite"})
              .catch(error => showError(el, error));
                $(".vega-actions").hide();
        }
    },
    watch: {
        house: function(a, b) {
            this.redraw();
        }
    },

});


const app2 = new Vue({
    el: '#app2',
    data: {
        spec: [1, 2, 3],
        kind: '',
    },
    created: function() {
        console.log("created");
        fetch('/blog/assets/images/altair/plot2.json')
            .then(response => response.json())
            .then(json => {
                this.spec = json;
                console.log(this.spec)

                const el = document.getElementById('vis2');
                vegaEmbed("#vis2", app2.spec, {"mode": "vega-lite"})
                  .catch(error => showError(el, error));
                $(".vega-actions").hide();
            })

    },
    methods: { 
        redraw: () => {
            const el = document.getElementById('vis2');
            console.log("app2", app2.spec)
            app2.spec.layer.map(x => {x.encoding.x.timeUnit = app2.kind})
            vegaEmbed("#vis2", app2.spec, {"mode": "vega-lite"})
              .catch(error => showError(el, error));
            $(".vega-actions").hide();
        }
    },
    watch: {
        kind: function(a, b) {
            this.redraw();
        }
    },

});

