// NOT ANGULAR
function styleSwitch(number){

	var array = ['mdl-color--blue-500',
	'mdl-color--orange-500', 
	'mdl-color--blue-grey-500',
	'mdl-color--brown-500',
	'mdl-color--amber-500',
	'mdl-color--teal-500',
	'mdl-color--red-600',
	'mdl-color--deep-purple-600',
	'mdl-color--cyan-600',
	'mdl-color--green-600',

	];

	if (number >= array.lenght){
		return 'mdl-color--blue-500';
	} else {
		return array[number];
	}
}
