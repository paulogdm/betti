// NOT ANGULAR
function styleSwitch(number){

	var array = [
	'mdl-color--blue-500',
	'mdl-color--orange-700',
	'mdl-color--blue-grey-500',
	'mdl-color--brown-500',
	'mdl-color--teal-500',
	'mdl-color--deep-purple-600',
	'mdl-color--cyan-600'
	];

	var size = Object.keys(array).length;

	//WTF is wrong with array.lenght?????
	// console.log(number);
	// console.log(array.lenght);
	// console.log(size);

	if (number < size) 
		return array[number];
	else return 'mdl-color--blue-500';
	
}

function styleSwitchBar(number){

	var array = [
	'mdl-color--blue-700',
	'mdl-color--orange-800',
	'mdl-color--blue-grey-700',
	'mdl-color--brown-700',
	'mdl-color--teal-700',
	'mdl-color--deep-purple-800',
	'mdl-color--cyan-800'
	];

	var size = Object.keys(array).length;

	//WTF is wrong with array.lenght?????
	// console.log(number);
	// console.log(array.lenght);
	// console.log(size);

	if (number < size) 
		return array[number];
	else return 'mdl-color--blue-500';
	
}
