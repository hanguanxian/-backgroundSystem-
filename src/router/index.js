import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'login',
        component: require("../components/Login.vue"),
    },
    {
        path: '/one',
        name: 'noe',
        component: require("../components/pages/One.vue"),
    },
    {
        path: '/two',
        name: 'two',
        component: require("../components/pages/Two.vue"),
    },
    {
        path: '/readme',
        name: 'Readme',
        component: require("../components/common/Home.vue"),
        children: [{
                path: "/",
                component: require("../components/pages/Readme.vue")
            }, {
                path: "/basetable",
                component: require("../components/pages/BaseTable.vue")
            }, {
                path: "/baseform",
                component: require("../components/pages/BaseForm.vue")
            } // , {
            //     path: "/vuetable",
            //     component: require("../components/pages/VueTable.vue") // vue-datasource组件
            // }, {
            //     path: "/vueeditor",
            //     component: require("../components/pages/VueEditor.vue") // Vue-Quill-Editor组件
            // }, {
            //     path: "/markdown",
            //     component: require("../components/pages/Markdown.vue") // Vue-Quill-Editor组件
            // }, {
            //     path: "/upload",
            //     component: require("../components/pages/Upload.vue") // Vue-Core-Image-Upload组件
            // }, {
            //     path: "/basecharts",
            //     component: require("../components/pages/BaseCharts.vue") // vue-schart组件
            // }, {
            //     path: "/drag",
            //     component: require("../components/pages/DragList.vue") // 拖拽列表组件
            // }
        ]
    }
]

//通过这个这个属性（是个函数），可以让应用像浏览器的原生表现那样，在按下 后退/前进 按钮时，简单地让页面滚动到顶部或原来的位置。
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
}
// 创建一个路由器实例,并且配置路由规则
export default new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'link-active',
    scrollBehavior,
    routes
});
