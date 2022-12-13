<template>
	<div id="app" class="container">
		<h1>Cadastre-se</h1>
		<b-alert class="alert" show dismissible v-for="msg in msgs" :key="msg.texto" :variant="msg.tipo">{{msg.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" v-model="user.nome" placeholder="Informe o seu nome"></b-form-input>
			</b-form-group>

			<b-form-group label="Email:">
				<b-form-input type="email" v-model="user.email" placeholder="Informe o seu email"></b-form-input>
			</b-form-group>

			<b-button class="mr-2" variant="primary" @click="salvar">Enviar</b-button>
			<b-button variant="success" @click="getUsers">Consultar</b-button>
		</b-card>

		<b-list-group class="mt-3">
			<b-list-group-item v-for="(user, id) in users" :key="id" class="mb-1">
				<strong >Nome</strong> {{user.nome}} <br/>
				<strong >Email</strong> {{user.email}} <br/>
				<strong >Id</strong> {{id}} <br/>
				<b-button variant="primary" @click="load(id)" class="mr-2">Carregar</b-button>
				<b-button variant="danger" @click="del(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	data(){
		return {
			msgs:[],
			users: [],
			id: null,
			user: {
				nome: '',
				email: ''
			}
		}
	},
	methods: {
		clean(){
			this.user.nome = ''
			this.user.email = ''
			this.id = null
			this.msgs= []
		},
		salvar(){
			const metodo = this.id ? 'patch': 'post'
			const finalUrl = this.id? `/${this.id}.json`: '.json'
			this.$http[metodo](`/user${finalUrl}`, this.user).then(() => {
				this.getUsers()
				this.clean()
				this.msgs.push({
					texto: 'Usuário adiconado com sucesso',
					tipo: 'success'
				})
			})
			.catch(() => { // () pode ser substituido pelo erro
					this.msgs.push({
						texto: 'Problema para deletar, tente novamente mais tarde',
						tipo: 'warning'
					})
				})

			
		},
		getUsers(){
			this.$http.get('user.json').then(res =>{
				this.users = res.data
			})

			this.$http.defaults.headers.common['authorization'] = 'autorização123'
		},
		load(id){
			this.id = id,
			this.user = {...this.users[id]}
		},
		del(id){
			this.$http.delete(`/user/${id}.json`).then((res) => {
				this.users = res.data
				this.getUsers()
				this.msgs.push({
					texto: 'Usuário deletado com sucesso',
					tipo: 'danger'
				})
			})
			.catch(()=> { // () pode ser substituido pelo erro
					this.msgs.push({
						texto: 'Problema para deletar, tente novamente mais tarde',
						tipo: 'danger'
					})
				})
		}
	}

	// created(){
	// 	this.$http.post('usuarios.json',{
	// 		nome: 'teste',
	// 		email: 'teste@email.com',
	// 	}).then()
	// }
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}

.alert {
	animation: pulse; 
	animation-duration: 1s; 
}

</style>
