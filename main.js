onload = main; // entry point

function parse_hex (nb)
{
	if (isNaN(nb) || nb < 0 || nb > 0xF)
	{
		return null;
	}

	return "0x" + nb.toString(16).toUpperCase();
}
function parse_bin_4 (nb) // 4bit
{
	if (isNaN(nb) || nb < 0 || nb > 0xF)
	{
		return null;
	}
	
	var bin = nb.toString(2);

	if (bin.length < 4)
	{
		bin = Array(5 - bin.length).join('0') + bin;
	}

	return bin;
}
function new_nb (maximum) // [ 1, (maximun - 1) ]
{
	return 1 + parseInt(Math.random() * (maximum - 1))
}
function new_operator (ops) // [ &, |, <<, >>, ~ ]
{
	var keys = Object.keys(ops);
	
	return keys[parseInt(Math.random() * keys.length)];
}
function new_operation (ops, nb_max) // Array [ operator, nb, visual ]
{
	var op = new_operator(ops);
	var nb = 0;
	var str = "";

	if (op == "<<" || op == ">>")
	{
		nb_max = 3;
	}
	str = op;
	if (op != "~")
	{
		nb = new_nb(nb_max);

		if (Math.random() < 0.5)
		{
			str += parse_hex(nb);
		}
		else
		{
			str += nb;
		}
	}

	return [ op, nb, str ];
}
function main ()
{
	var max = 0xF;
	var all_operations = {
		"&": function (a, b)
		{
			return a & b;
		},
		"|": function (a, b)
		{
			return a | b;
		},
		"^": function (a, b)
		{
			return a ^ b;
		},
		"<<": function (a, b)
		{
			return (a << b) & 0xF;
		},
		">>": function (a, b)
		{
			return a >> b;
		},
		"~": function (a)
		{
			return (~a >>> 0) & 0xF;
		}
	};
	var origin = 0;
	var answer = 0;
	var op = new_operation(all_operations, max);
	var operator = op[0];
	var nb = op[1];
	var visual_op = op[2];
	
	function update (event)
	{
		function mistake ()
		{
			dec.value = "";
			hex.value = "";
			bin.value = "";
			answer = 0;

		}

		switch (event.target.id)
		{
			case "dec":			
				var val = parseInt(dec.value);

				if (dec.value == val && val >= 0 && val <= 0xF)
				{
					output.innerHTML = "";
					hex.value = parse_hex(val) || "0x0";
					bin.value = parse_bin_4(val) || "0000";
					answer = val;
				}
				else
				{
					mistake();
				}
			break;
			case "bin":
				var val = parseInt(bin.value, 2);

				if (val && val >= 0 && val <= 0xF)
				{
					output.innerHTML = "";
					dec.value = val;
					hex.value = parse_hex(val) || "0x0";
					answer = val;
				}
				else
				{
					mistake();
				}
			break;
			case "hex":
				var val = parseInt(hex.value, 16);

				if (val && val >= 0 && val <= 0xF)
				{
					output.innerHTML = "";
					dec.value = val;
					hex.value = parse_hex(val) || "0x0";
					bin.value = parse_bin_4(val) || "0000";
					answer = val;
				}
				else
				{
					mistake();
				}
			break;

		}
	}

	function set_txt ()
	{
		if (!origin)
		{
			origin = 0;
		}

		var str = "Binary: " +
			(parse_bin_4(origin) || "0000") +
			"<br>" +
			"Decimal: " +
			origin +
			"<br>" +
			"Hexadecimal: " +
			(parse_hex(origin) || "0x0") +
			"<br>" +
			"<h2>" + visual_op + "<h2>";

		txt.innerHTML = str; 
	}

	function valid ()
	{
		var good_answer = all_operations[operator](origin, nb);

		if (good_answer == answer)
		{
			origin = answer;
			answer = 0;
			output.innerHTML = "<p class='right'>Good Game!</p>";

			op = new_operation(all_operations, max);
			operator = op[0];
			nb = op[1];
			visual_op = op[2];

			set_txt();	
		}
		else
		{
			output.innerHTML = "<p class='wrong'>wrong, try again</p>";
		}
	}

	function enter (event)
	{
		if (event.keyCode == 13) // "enter" key
		{
			valid();
		}
	}

	dec.oninput = bin.oninput = hex.oninput = update;
	submit.onclick = valid;
	window.onkeydown = enter;

	set_txt();
}

