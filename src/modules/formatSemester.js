export default {
    toSemester: function (date) {
        if (!date) return null;
        var year = date.substring(0, 4);
        var p = date.substring(5);
        //translates period to corresponding
        //period in "Teknisk-naturvetenskapliga fakulteten" for now.
        if (p < 3) return "VT " + year + ", period " + (parseInt(p) + 2);
        if (p > 3) return "HT " + year + ", period " + (p - 3);
        else return "Sommar " + year;
    },
    toShortSemester: function (date) {
        if (!date) return null;
        var semester = this.toSemester(date);
        var shortSemester = semester.substring(0, 2) + semester.substring(5, 7);
        return shortSemester;
    },
}