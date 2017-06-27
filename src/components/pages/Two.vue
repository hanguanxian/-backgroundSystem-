<template>
<div id="two">
    <h1>{{ msg }}</h1>
    <h2>two</h2>
    <ul>
        <li>
            <router-link to="/one">Go to Foo</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'two',
    data() {
        return {
            msg: 'two'
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
