export default defineNuxtRouteMiddleware((to, from) => {
	console.log('要去那个页面:' + to.path)
	console.log(to)
	console.log('来自那个页面:' + from.path)
	console.log(from)

	if (to.path === '/demo1') {
		console.log('禁止访问这个页面')
		abortNavigation() //停止当前导航，可以使用error进行报错
		return navigateTo('/')
	}
})
