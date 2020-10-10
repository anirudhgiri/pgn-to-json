/**
 * 
 * @param {String} pgn The PGN to be cleaned
 */
function cleanPGN(pgn){
    const pgn_lines = pgn.split('\n');
    let notation_part = pgn_lines.splice(pgn_lines.findIndex(val => val === '') + 1);
    notation_part = notation_part.join(' ');
    pgn_lines.push(notation_part);
    return pgn_lines.join('\n');
}

/**
 * Converts a PGN to JSON
 * @param {String} pgn The PGN to be converted to JSON
 * @returns {JSON} The PGN in JSON format 
 */
function PGNtoJSON(pgn){
    let json = {};
    cleaned_pgn = cleanPGN(pgn);
    const pgn_lines = cleaned_pgn.split('\n');
    for(let i = 0; i < pgn_lines.length-1; i++){
        let line_regex_match = pgn_lines[i].match(/^\[(.*) "(.*)"\]$/);
        if(line_regex_match)
            json[line_regex_match[1]] = line_regex_match[2];
    }
    json['Movetext'] = pgn_lines[pgn_lines.length-1];
    return(json);
}

module.exports = {
    PGNtoJSON : PGNtoJSON
}