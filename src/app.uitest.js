import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `http://localhost:3000/`;  // specify the start page


//then create a test and place your code there
test('Title Test', async t => {

    const article = Selector('#root > div > header > h1');
    await t.expect(article.innerText).eql("Office bingo");
});

test('Button can`t be clicked more than 5 times', async t => {

    const addButton = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
    const btnClickedNumber = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > p:nth-child(2)');
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);

    await t.expect(btnClickedNumber.innerText).eql("Clicked: 4");
});



