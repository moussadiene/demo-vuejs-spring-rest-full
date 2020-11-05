<template>
<div class="row col-9">
            <div class="card" style="width:94%">
                <div class="card-header text-dark">VUE.JS</div>
                <div class="card-body">
                    <div class="row">
                        <!-- <div class="col-6">
                            <label for="" class="col-5">Ligne</label>
                            <input type="text"  class="form-control form-control-sm col-6" value="09" readonly >
                        </div> -->
                        <div class="col-6">
                          <br><br>
                            <label for="">Pharmacie
                             
                                <input type="text" name="recherche" id="recherche" class="form-control form-control-sm" v-model="recherche" @keyup="rechercher">
 <br>
                              <br>
                              <br>
                            </label>
                            <hr>
                        </div>
                    </div>
                    <table id="listePhysique" class="table table-striped table-bordered table-sm table-hover" style="width:100%">
                        <thead>
                            <tr>
                                <th class="th-sm">Nom </th>
                                <th class="th-sm">Quartier </th>
                                <th class="th-sm">Village </th>
                                <th class="th-sm">Etat </th>
                                <th>Action </th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entreprise in listes" :key="entreprise.id">
                                <td>{{ entreprise.nom }}</td>
                               <td>{{ entreprise.quartier }}</td>
                                <td>{{ entreprise.ville }}</td>
                                <td>{{ entreprise.etat}}</td>
                                <td>
                                    <div class="">
                                        <a type="button" class="btn btn-secondary btn-sm col-5" data-toggle="modal" data-target="#editEntrepriseModal" @click="getEntreprise(entreprise.id)">
                                        edit
                                        </a>&nbsp;
                                        <a type="button" class="btn btn-danger btn-sm col-5" @click="deleteEntreprise(entreprise.id)">
                                            sup
                                        </a>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        <!-- v-bind est une methode qui permet des passer des valeur d'une page vue en un autre -->
        </div>

</template>

<script>
export default {
  name: 'HelloWorld',

        data(){
            return {
                listes:{},
                entreprise : '',
                recherche : ''
            }
        },

        created(){
            axios.get('http://localhost:8080/pharmacies')
                .then(response => this.listes = response.data)
                .catch(error => console.log(error))
        },
        // fonction de vue pour la definistion de l'ensemble de mes methodes de ma page
        methods : {
                 // Our method to GET results from a Laravel endpoint
            getResultats(page = 1) {
                axios.get('http://localhost:8080/pharmacies/' + page)
                    .then(response => {
                        this.listes = response.data;
                    })
            },
            // pour le bouton edit
            getEntreprise(id){
                axios.get('http://localhost:8080/pharmacies/' + id)
                    .then(response => this.entreprise =  response.data )
                    .catch(error => console.log(error))
            },

            deleteEntreprise(id){
                axios.delete('http://localhost:8080/pharmacies/' + id)
                    .then(response => {
                        this.listes = response.data;
                    })
                    .catch(error => console.log(error))
            },
            rechercher(){
                if(this.recherche.length > 2 ){
                    axios.get('http://localhost:8080/findPharmacie?nom='+ this.recherche )
                        .then(response => this.listes = response.data)
                        .catch(error => console.log(error))
                }else{
                    axios.get('http://localhost:8080/pharmacies/')
                        .then(response => this.listes = response.data)
                        .catch(error => console.log(error))
                }

            },
            actualiser(listes) {
                this.listes = listes
            }

        },
        mounted() {
            axios.get('http://localhost:8080/pharmacies')
                .then(response => this.listes = response.data)
                .catch(error => console.log(error))
        }

    }
</script>
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
