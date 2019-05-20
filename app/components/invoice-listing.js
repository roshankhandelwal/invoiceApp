import Component from '@ember/component';

export default Component.extend({

    actions: {
        editInvoice() {
            this.onEdit(this);
        },

        deleteInvoice() {
            this.onDelete(this);
        }
    }
});
