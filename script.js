var app = new Vue({
    el: '#app',
    data: {
      titulo: 'ToDo List',
      tareas: [],
      nuevaTarea: '',
      timestamp: ''
    },
    methods: {
        agregarTarea: function(){
            this.tareas.push({
                nombre: this.nuevaTarea,
                estado: false
            });
            // console.log(this.tareas);
            this.nuevaTarea = '';
            localStorage.setItem('toDoList-vue', JSON.stringify(this.tareas));
        },
        editarTarea: function(index){
            this.tareas[index].estado = true;
            localStorage.setItem('toDoList-vue', JSON.stringify(this.tareas));
        },
        eliminarTarea: function(index){
            this.tareas.splice(index, 1);
            localStorage.setItem('toDoList-vue', JSON.stringify(this.tareas));
        },
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date +' '+ time;
            this.timestamp = this.convertDateFormat(date);
        },
        convertDateFormat: function (date) {
            var info = date.split('-').reverse().join('/');
            return info;
        }
    },
    created: function(){
        let datosDB = JSON.parse(localStorage.getItem('toDoList-vue'));
        setInterval(this.getNow, 1000);
        if(datosDB === null){
            this.tareas = [];
        } else {
            this.tareas = datosDB;
        }
    },
    directives: {
        focus: {
          // directive definition
          mounted(el) {
            el.focus()
          }
        }
      }
  })