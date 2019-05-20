import Component from '@ember/component';
import Object from '@ember/object';
import { v4 } from "ember-uuid";
import Ember from "ember";

const Invoice = Object.extend({
    id: null,
    description: '',
    amount: 0
});

export default Component.extend({

    isShowingAddModal: false,
    isEditMode : false,
    newInvoice : Invoice.create(),

    subtotal : 0,
    finalTotal : 0,
    taxAmount : 5,
    salesTax : 12,

    init() {
        this._super(...arguments);
        this.recalculateTotal();
    },

    recalculateTotal() {
        let subtotal = 0;
        this.items.forEach(item => {
            subtotal += item.amount !== undefined ? ( parseFloat(item.amount) !== undefined ? parseFloat(item.amount) : 0 ) : 0;
        });
        let subtotal_tax = subtotal + (subtotal * (this.taxAmount / 100));
        let subtotal_tax_sales = subtotal_tax + (subtotal_tax * (this.salesTax / 100));

        this.set('subtotal', Math.round(subtotal * 100)/100);
        this.set('finalTotal', Math.round(subtotal_tax_sales * 100)/100);
    },

    actions : {
        deleteInvoice(event) {
            let invoiceToDelete = event.item;
            let invoicesFiltered = this.items.filter(item => item.id !== invoiceToDelete.id);
            // console.log(itemsFiltered);
            this.set('items', invoicesFiltered);
            this.recalculateTotal();
        },

        showInvoiceModal() {
            this.set('isEditMode', false);
            this.toggleProperty('isShowingAddModal'); 

            this.set('newInvoice', Invoice.create({
                id: null,
                description: '',
                amount: 0
            }));
        },

        addInvoice(newInvoice) {

            this.toggleProperty('isShowingAddModal'); 
            console.log(this.isEditMode);
            if(!this.isEditMode) {
                newInvoice.id = v4();
                this.items.pushObject(newInvoice);
            } else {

                let newItems = this.items.map(item => {
                    if(item.id == newInvoice.id) {
                        // item.setProperties({
                        //     description : newInvoice.description,
                        //     amount : newInvoice.amount
                        // });
                        Ember.set(item, 'description', newInvoice.description);
                        Ember.set(item, 'amount', newInvoice.amount);
                    }
                    return item;
                });     
                this.set('items', newItems); 
            }

            this.recalculateTotal();
        },

        closeModal() {
            this.toggleProperty('isShowingAddModal'); 
        },

        editInvoice(invoiceToEdit) {
            this.set('isEditMode', true);

            // console.log(invoiceToEdit);

            this.newInvoice = Invoice.create({
                id: invoiceToEdit.item.id,
                description: invoiceToEdit.item.description,
                amount: invoiceToEdit.item.amount
            }),

            // console.log(this.newInvoice);

            // let newInvoice = Object.extend({
            //     pets: alias('husband.pets')
            //   });


            // this.set('newInvoice', invoiceToEdit);

            this.toggleProperty('isShowingAddModal'); 
            
        }
    }
});
