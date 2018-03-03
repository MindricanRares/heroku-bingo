import { Selector } from 'testcafe';

fixture `Testing bingo card`
    .page `http://localhost:3000/`;

test('ShouldNotLetCardHaveMoreThan5Clicks', async t => {

    const addButton = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
    const btnClickedNumber = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > p:nth-child(2)');
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);
    await t.click(addButton);

    await t.expect(btnClickedNumber.innerText).eql("Clicked: 4");
});

test('ShouldNotLetCardHaveNegativeClicks', async t => {

    const addButton = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
    const delButton=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-danger.bingo-card-btn')
    const btnClickedNumber = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > p:nth-child(2)');
    await t.expect(btnClickedNumber.innerText).eql('Clicked: 0');
    await t.click(addButton);
    await t.expect(btnClickedNumber.innerText).eql('Clicked: 1');    
    await t.click(delButton);
    await t.click(delButton);
    await t.expect(btnClickedNumber.innerText).eql('Clicked: 0');    
});