'use Strict'

var dropDown = document.getElementsById('"dropdown"');
var container = document.getElementsById('container');
var offerSquare1 = document.getElementsById('offerSquare1');
var offerSquare2 = document.getElementsById('offerSquare2');
var offerSquare3 = document.getElementsById('offerSquare3');

var list = document.createElement('ul');
var h2 = document.createElement('h2');

container.appendChild(offerSquare1);
container.appendChild(offerSquare2);
container.appendChild(offerSquare3);

var clothes = ['Shirts', 'Jackects', 'Pants', 'Skirt/Dress'];

dropDown.addEventListener('change', RenderOffer);

function RenderOffer() {
    switch () {
        case ('select' = `TA's Offers`):
            for (let index = 0; index < clothes.length; index++) {
                h2.textContent = '50% Offer for TA\'s';
                let li = document.createElement('li');
                li.textContent = clothes[index];
                list.appendChild(li);
            }
            offerSquare1.appendChild(list);
            break;

        case ('select' = `Student's Offers`):
            for (let index = 0; index < clothes.length; index++) {
                h2.textContent = '25% Offer for Students';
                let li = document.createElement('li');
                li.textContent = clothes[index];
                list.appendChild(li);
            }
            offerSquare2.appendChild(list);
            break;

        case ('select' = `Adminstrator's Offers`):
            for (let index = 0; index < clothes.length; index++) {
                h2.textContent = '10% Offer for Adminstrators';
                let li = document.createElement('li');
                li.textContent = clothes[index];
                list.appendChild(li);
            }
            offerSquare3.appendChild(list);
            break;

        default:
            console.log('no condition has met in switch case');
            break;
    };

