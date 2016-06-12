/**
 * AdminSpaceController
 *
 */

module.exports = {
		
	upload: function (req, res) {
		var requester = req.cookies.token;
		var data = req.param('data');

		ImportExportService.import(requester, data, function(result){
			res.json(result);
		});
	},

	download: function (res, res){
		var requester = req.cookies.token;

		ImportExportService.export(requester, function(result){
			res.json(result);
		});
	}
};
