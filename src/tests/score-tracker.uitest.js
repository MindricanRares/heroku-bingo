import { Selector } from 'testcafe';

fixture `Testing score tracker`
    .page `http://localhost:3000/`;

test('ShouldAddScoreFromOneCard', async t => {
    const score= Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
    await t.expect(score.innerText).eql('The total score is :0');
    const addButton = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');    
    await t.click(addButton);
    await t.expect(score.innerText).eql('The total score is :100');    
});
