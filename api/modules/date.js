
exports.getDate = () => {

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    };

    return new Date().toLocaleDateString('en-us', options);
};

exports.getDay = () => {

    let options = {
        weekday: 'long'
    };

    return new Date().toLocaleDateString('en-us', options);
};

exports.getFullDate = () => {

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return new Date().toLocaleDateString('en-us', options);
};


// function getDay() {
//     let options = {
//         weekday: 'long'
//     };

//     return new Date().toLocaleDateString('en-us', options);
// }


// function getDate() {
//     let options = {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long',
//     };

//     return new Date().toLocaleDateString('en-us', options);
// }

// function getFullDate() {
//     let options = {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long',
//         // year: 'numeric'
//     };

//     return new Date().toLocaleDateString('en-us', options);
// }