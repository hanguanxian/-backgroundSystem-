<template>
<div id="one">
    <h1>{{ msg }}</h1>
    <h2>one</h2>
    <ul>
        <li>
            <router-link to="/two">Go to Foo</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'one',
    data() {
        return {
            msg: 'one '
        }
    }
}
</script>

<style scoped>
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
