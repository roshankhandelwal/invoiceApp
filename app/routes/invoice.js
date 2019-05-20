import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return {
            items : [{
                id : '688848be-bb49-48e5-be74-05cd853cbdeb',
                description : 'Bow and Arrow',
                amount : 12.99
            }, {
                id : '29c547bd-5042-4931-bf0b-4b8c58180e5d',
                description : 'Super charged Rocket',
                amount : 46.99
            }] 
        }
    }
});
