/*
 * Module for finding the type of a file based on the first few bytes.
 *
 * By Will Voelcker
 *
 * http://www.willv.net
 */


var WV_MagicNumbers = (function() {

	// Work out a file's mime-type from the start of its data.
	// Patterns based on http://www.garykessler.net/library/file_sigs.html
	// Mime types from PHP's finfo() function, and Google searches
	function getMimeType(fileStartHex) {

		// MPEG-4 Advanced Audio Coding (AAC) Low Complexity (LC) audio file
		if (/^FFF[19]/.test(fileStartHex)) {
			return "audio/aac";

		// MPEG-1 Audio Layer 3 (MP3) audio file
		} else if (/^494433/.test(fileStartHex)) {
			return "audio/mpeg";

		// MPEG audio file frame synch pattern
		} else if (/^FFF[2-8A-Z]/.test(fileStartHex)) {
			return "audio/mpeg";

		// Apple Lossless Audio Codec file
		} else if (/^.{8}667479704D344120/.test(fileStartHex)) {
			return "audio/x-m4a";

		// Wav file
		} else if (/^52494646.{8}57415645666D7420/.test(fileStartHex)) {
			return "audio/x-wav";

		// Don't allow anything else
		} else {
			throw new Error("Unknown or invalid file type");
		}
	}

	function base64toHEX(base64) {
		var raw, HEX, _hex, i;

		raw = atob(base64);
		HEX = '';
		for ( i = 0; i < raw.length; i++ ) {
			_hex = raw.charCodeAt(i).toString(16)
			HEX += (_hex.length==2?_hex:'0'+_hex);
		}
		return HEX.toUpperCase();
	}

	return {
		"base64toHEX": base64toHEX,
		"getMimeType": getMimeType
	};

}());

// Export the object for use elsewhere
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		return WV_MagicNumbers;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = WV_MagicNumbers;
} else if (typeof window != "undefined") {
	window.WV_MagicNumbers = WV_MagicNumbers;
}
