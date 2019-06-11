const {Genre, validate} = require('../models/genres');

async function getGenre() {
    return await Genre.find().sort('genre');;
}

async function addGenre(genre) {
    const {error} = validate(genre);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    let newGenre = new Genre({genre: genre.genre});

    return await newGenre.save();
}

async function updateGenre(id, genre) {
    const {error} = validate(genre);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    const updatedGenre = await Genre.findOneAndUpdate(id, genre, {new: true});
    if(!updatedGenre){
        throw new Error('The genre with the given ID was not found.');
        return;
    }

    return updatedGenre;
}


async function deleteGenre(id) {
    const genre = await Genre.findByIdAndRemove(id);

    if(!genre){
        throw new Error('The genre with the given ID was not found.');
        return;
    }

    return genre;
}

module.exports.getGenre = getGenre;
module.exports.addGenre = addGenre;
module.exports.updateGenre = updateGenre;
module.exports.deleteGenre = deleteGenre;