Vue.component("navbar", {
        template: `
        <nav class="navbar">
	<div class = "navbar_container">
		<a href = "index.html" id="navbar_logo"><img class= "logo" src="img/logo.png" alt=""></a>
		<div class="navbar_toggle" id = "mobile-menu">
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</div>

		<ul class="navbar_menu">
			<li class="navbar_item">
				<a href="index.html" class="navbar_links">Juego</a> 
			</li>
			<li class="navbar_item">
				<a href="reglas.html" class="navbar_links">Reglas</a> 
			</li>
			<li class="navbar_item">
				<a href="preguntas.html" class="navbar_links">Agregá tu pregunta!</a> 
			</li>
			<li class="navbar_item" id="contact-page">
				<div class="navbar_btn">
					<a href="https://brunocuevas.ml/" class="button" target="_blank">Bruno.Cuevas</a> 
				</div>
			</li>
		</ul>
	</div>
</nav>
        `,
}
        
)

const nav = new Vue({
    el: "#my-nav",
});

// Close Mobile Menu when clicking on a menu item 

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar_menu");
const navLogo = document.querySelector("#navbar_logo");

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
 };
 menu.addEventListener("click", mobileMenu);

const hideMobileMenu = () => { 
    const menuBars = document.querySelector(".is-active");
    if(window.innerWidth<=768 && menuBars){
        menu.classList.toggle("is-active");
        menuLinks.classList.remove("active");
    }
};

menuLinks.addEventListener("click", hideMobileMenu);
navLogo.addEventListener("click", hideMobileMenu);

