import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/registration",
			name: "registration",
			component: () => import("../views/Registration.vue"),
		},
		{
			path: "*",
			redirect: "/",
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name !== "registration" && !localStorage.getItem("user")) {
		next({
			name: "registration",
		});
		return;
	}
	next();
});

export default router;
