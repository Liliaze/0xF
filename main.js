onload = main;
function main ()
{
	var title = document.getElementById("titre");
	var screen = document.getElementById("screen");
	var result1 = document.getElementById("resultat1");
	var result2 = document.getElementById("resultat2");
	var button = document.getElementById("submit");

	title.style.display = "block";
	title.style.margin = "0 auto";

	var max = 0xF;
	var min = 0;
	var number = 0;
	var res = 0;
	var operator = new_operator(max);

	
}

function new_operator (banane)
{
	return Math.random() * banane
}
