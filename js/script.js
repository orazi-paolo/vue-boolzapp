const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            // proprietà per il contatto attivo
            activeContact: {
                name: '',
                avatar: '',
                visible: false,
                messages: []
            },
            // proprietà per il nuovo messaggio
            newMessage: '',
            // proprietà da collegare all'input di ricerca
            searchContact: '',
            // array per i contatti filtrati e non
            filteredContactsArray: [],
            // variabile per tenere traccia del menu aperto
            dropdownIndex: null,
        }
    },
    methods: {
        // funzione per selezionare il contatto attivo
        selectContact(contact) {
            this.activeContact = contact || { name: '', avatar: '', visible: false, messages: [] };
        },
        // funzione per inviare un messaggio
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                if (!this.activeContact.messages) {
                    this.activeContact.messages = [];
                }
                this.activeContact.messages.push({
                    date: this.getCurrentDate(),
                    message: this.newMessage,
                    status: 'sent'
                });
                this.cleanerNewMessage();
                setTimeout(() => {
                    this.activeContact.messages.push({
                        date: this.getCurrentDate(),
                        message: 'ok',
                        status: 'received'
                    });
                }, 1000);
            }
        },
        // funzione per cancellare il testo dall'input
        cleanerNewMessage() {
            this.newMessage = '';
        },
        // funzione per cercare la data del messaggio
        getCurrentDate() {
            const now = new Date();
            // ottengo giorno mesi e anno correnti e se sono minori di 10 aggiungo uno 0 davanti
            const day = (now.getDate() < 10 ? '0' : '') + now.getDate();
            const month = ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1);
            const year = now.getFullYear();
            // ottengo ore minuti e secondi correnti e se sono minori di 10 aggiungo uno 0 davanti
            const hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
            const minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
            const seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
            // combino il tutto
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        },
        // funzione per filtrare i contatti
        filterContacts() {
            if (!this.searchContact) this.filteredContactsArray = this.contacts;
            else this.filteredContactsArray = this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchContact.toLowerCase()));
        },
        // funzione per far comparire il dropdown
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        // funzione per eliminare il messaggio selezionato
        deleteMessage(index) {
            console.log(`eliminato il messaggio all index ${index}`);
            console.log('messaggio prima di eliminarlo' + this.activeContact.messages);
            if (index >= 0 && index < this.activeContact.messages.length) {
                this.activeContact.messages.splice(index, 1);
            }
            console.log('Proprietà messaggi dopo averli eliminati:', this.activeContact.messages);
            if (this.dropdownIndex === index) this.dropdownIndex = null;
        },
    },
    // inizializzo il filtro dei contatti a tutti i contatti
    mounted() {
        // se non ci sono messaggi, li inizializzo vuoti
        this.contacts.forEach(contact => {
            if (!contact.messages) {
                contact.messages = [];
            }
        });
        // inizializzo il contatto attivo al primo contatto
        this.activeContact = this.contacts[0] || { name: '', avatar: '', visible: false, messages: [] };
        this.filteredContactsArray = this.contacts;
    },
    // funzione per far comparire il contatto attivo all'avvio
    created() {
        this.activeContact = this.contacts[0] || { name: '', avatar: '', visible: false, messages: [] };
    }
}).mount('#app')