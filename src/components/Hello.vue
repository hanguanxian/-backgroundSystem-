<template>
<div id="hello">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>hello</h2>
    <ul>
        <li>
            <router-link to="/one">Go to Foo</router-link>
        </li>
    </ul>

</div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: 'there is hello'
        }
    }
}
</script>

<style scoped>
#hello {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
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
