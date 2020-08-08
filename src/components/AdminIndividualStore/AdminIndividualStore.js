import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Input, TextArea, Form, Modal, Icon, Grid, Label } from 'semantic-ui-react';
import Moment from 'react-moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

// Uncomment out after presentation.
// import Dropzone from 'react-dropzone-uploader'

// Delete 'import Dropzone from 'react-dropzone' after presentation.
import Dropzone from 'react-dropzone'
// End Delete 'import Dropzone from 'react-dropzone' after presentation.

import RegisterPage from '../RegisterPage/RegisterPage'
import ViewContract from '../ViewContract/ViewContract'

import 'react-dropzone-uploader/dist/styles.css'
import 'semantic-ui-css/semantic.min.css';
import './AdminIndividualStore.scss';



class AdminIndividualStore extends Component {

// Delete onDrop after presentation.
    onDrop = (acceptedFiles) => {
        console.log('onDrop:', acceptedFiles);
        const upload = acceptedFiles[0];
        this.setState({
            store_inventory: acceptedFiles
        })
        this.props.dispatch({ 
            type: 'UPDATE_AWS_BUCKET',
            payload: this.state })
    } // End Delete onDrop after presentation.

    state = {
        store_id: "",
        storeName: "",
        address: "",
        timezone: "",
        phoneNumber: "",
        email: "",
        pointOfContact: "",
        tablets_quantity: "",
        printers_quantity: "",
        tablet_stands_quantity: "",
        emailModalOpen: false,
        registerModalOpen: false,
        randomPassword: ( Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) ),
        isCopied: 'false',
        modalOpen: false,
        edit: false,
        currentUser: '',
        user_id: '',
        store_name: '',
        customer_email: '',
        store_status: '',
        date_joined: '',
        notes: '',
        business_type: '',
        contract: '',
        moonclerk_url: '',
        active_customer: '',
        subject: 'Welcome To Pretsl!',
        email_body: `We are happy to welcome you to Pretsl!
        
        Your login credentials are
        Username:
        Password:
        
        Follow this link to complete payment so we can get you on the way to having goods in customer's hands:`,
    }

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
            // store_id: this.props.reduxState.locationsReducer[0].store_id,
            [propertyName]: event.target.value,
        });
    };

    handleSave() {

        const locationObj = {
            store_id: this.props.reduxState.individualStoreReducer.id,
            address: this.state.address,
            timezone: this.state.timezone,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            pointOfContact: this.state.pointOfContact,
            tablets_quantity: this.state.tablets_quantity,
            printers_quantity: this.state.printers_quantity,
            tablet_stands_quantity: this.state.tablet_stands_quantity,
        }
        console.log('locationObj', locationObj);
        

        this.props.dispatch({
            type: "POST_LOCATION",
            payload: locationObj,
        });

        this.setState({
            store_id: "",
            storeName: "",
            address: "",
            timezone: "",
            phoneNumber: "",
            email: "",
            pointOfContact: "",
            tablets_quantity: "",
            printers_quantity: "",
            tablet_stands_quantity: "",
            modalOpen: false,
        });
        this.handleClose();
    }

    handleEdit() {
        this.setState({ mode: "edit" });
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    goBack = () => {
        this.props.history.push('/AdminDashboard')
    }

    toggleEdit = () => {
        console.log('in toggleEdit');
        this.setState({
            edit: !this.state.edit,
            id: this.props.store.id,
            user_id: this.props.store.user_id,
            store_name: this.props.store.store_name,
            customer_email: this.props.store.customer_email,
            store_status: this.props.store.store_status,
            date_joined: this.props.store.date_joined,
            notes: this.props.store.notes,
            business_type: this.props.store.business_type,
            contract: this.props.store.contract,
            moonclerk_url: this.props.store.moonclerk_url,
            active_customer: this.props.store.active_customer,
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    submitChanges = () => {
        this.props.dispatch({ type: 'UPDATE_STORE', payload: this.state })
        this.setState({
            edit: false,
        })
    }

    sendMail = () => {
        let newEmail = {
            customer_email: this.state.customer_email,
            subject: this.state.subject,
            email_body: this.state.email_body,
        }
        this.props.dispatch({ type: 'SEND_EMAIL', payload: newEmail })
        this.handleCloseEmail();
    }

    handleOpenEmail = () => {
        this.setState({
            emailModalOpen: true,
            customer_email: this.props.store.customer_email,
        })
    }

    secretClick = () => {
        this.setState({})
    }


    MyUploader = () =>{
    // specify upload params and url for your files
        const getUploadParams = () => (
            // try{{
            //     url: '/upload'
            // }
            // }catch(err);
            // try{{

            //     url: '/upload',
            //     client_id: this.state.user_id
                
            // }

            {
                url:'/upload',
                "fields": {
                    client_id: this.props.store.user_id,
                    food: 'tacos'
                }
                
            }
        );
        // const getUploadParams = async ({ meta }) => { 
        // const res = await axios.post('/upload');
        // console.log("POST /upload", res.data);

        // const params = { 
        //     fields: res.data.fields, 
        //     meta: { 
        //     fileUrl: `${res.data.url}/${res.data.fields.key}`
        //     }, 
        //     url: res.data.url 
        // };
        // console.log('params', params);
    
        // ENABLE CORS on your bucket
        /**
            <?xml version="1.0" encoding="UTF-8"?>
            <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <CORSRule>
                <AllowedOrigin>http://localhost:3000</AllowedOrigin>
                <AllowedMethod>POST</AllowedMethod>
                <AllowedHeader>*</AllowedHeader>
            </CORSRule>
            </CORSConfiguration>
        */
    
        // return params;
        // }


        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = (files, allFiles) => {
       
        allFiles.forEach(f => f.remove());
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onSubmit = {handleSubmit}
            />
    )
    }

    handleClose = () => this.setState({ modalOpen: false })
    openRegisterNewCustomer = () => {
        console.log('registerNewCustomer clicked');
        
        this.setState({
            registerModalOpen: true
        })
    }

    submitRegisterNewCustomer = () => {
        console.log('submitRegisterNewCustomer clicked');
        
    }

    copyToClipboard = () => {
        console.log('copyToClipboard clicked');

    }

    autoPopulateForm = () => {
        console.log('autoPopulateForm clicked', this.props.reduxState.individualStoreReducer.id);
        this.setState({
            storeName: `Lindsey's Patisserie on Grand`,
            address: "542 Grand Ave, St. Paul, MN; 55104",
            timezone: "Central",
            phoneNumber: "651-233-4525",
            email: "patisserieongrand@gmail.com",
            pointOfContact: "Lindsey",
            tablets_quantity: "2",
            printers_quantity: "2",
            tablet_stands_quantity: "2",
        })
    }

    handleCloseEmail = () => this.setState({ emailModalOpen: false })
    handleCloseRegister = () => this.setState({ registerModalOpen: false })

    render() {
        const currentUser = this.props.userlist.find(user => user.id === this.props.store.user_id)

        const file = '../../public/images/PRETSL Android Icon.png'
        const type = 'png'
        
        return (
            <div>
                {console.log(this.state, 'this.state')}
            <Container className='pageHeader'>
                <Modal
                    trigger={<Button className='emailButton' onClick={this.handleOpenEmail}>Send Mail</Button>}
                    open={this.state.emailModalOpen}
                    onClose={this.handleCloseEmail}
                    size='small'
                >
                    <Header icon='browser' content='Draft an E-mail' />
                    <Modal.Content>
                        <Form className='email-modal'>
                            <Form.Field>
                                <Header as='h4'>Subject</Header>
                                <Input name='subject' value={this.state.subject} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <Header as='h4'>E-mail Body</Header>
                                <Form.TextArea name='email_body' value={this.state.email_body} onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.sendMail}>
                            <Icon name='checkmark' />Send Message
                            </Button>
                    </Modal.Actions>
                </Modal>

                <Modal
                    trigger={<Button className="registerCustomerButton"
                    onClick={this.openRegisterNewCustomer}>
                    Register New Customer</Button>}
                    open={this.state.registerModalOpen}
                    onClose={this.handleCloseRegister}
                    size='small'
                >
                    <Header content="Register New Customer"/>
                    <Modal.Content>
                        <Header icon="attention" content="ATTENTION"/>
                            <p>Remember to note the username and password you generate!</p>
                            <p>You need to paste these in the email you send to the client to verify account has been created!</p>

                            <RegisterPage/>
                            
                            <Form.Field>
                                <Header as="h4">Suggested password:</Header>
                                    <Input name="password" value={this.state.randomPassword}/> 
                                    <div className="copyButton">
                                        <CopyToClipboard 
                                            text={this.state.randomPassword}
                                            onCopy={() => this.setState({isCopied: true})}>
                                            <Button icon='copy' inverted color='violet'></Button>
                                        </CopyToClipboard>
                                    </div>
                            </Form.Field>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleCloseRegister}>
                            <Icon name='angle double left' />Back to Profile
                        </Button>
                    </Modal.Actions>
                </Modal>
                    <Modal
                        closeIcon
                        trigger={<Button className='locationButton' onClick={this.handleOpen}>Add Location</Button>}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                    >
                        <Header as='h1' content='Add New Location' onClick={this.autoPopulateForm} />
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <Input
                                        label='Store Name'
                                        type="text"
                                        name="storeName"
                                        onChange={this.handleInputChangeFor("storeName")}
                                        value={this.state.storeName}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Address'
                                        name="address"
                                        onChange={this.handleInputChangeFor("address")}
                                        value={this.state.address}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Timezone'
                                        name="timezone"
                                        onChange={this.handleInputChangeFor("timezone")}
                                        value={this.state.timezone}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Phone Number'
                                        name="phoneNumber"
                                        onChange={this.handleInputChangeFor("phoneNumber")}
                                        value={this.state.phoneNumber}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='E-mail'
                                        name="email"
                                        onChange={this.handleInputChangeFor("email")}
                                        value={this.state.email}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Point Of Contact'
                                        name="pointOfContact"
                                        onChange={this.handleInputChangeFor("pointOfContact")}
                                        value={this.state.pointOfContact}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Tablet Quantity'
                                        name="tablets_quantity"
                                        onChange={this.handleInputChangeFor("tablets_quantity")}
                                        value={this.state.tablets_quantity}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Printer Quantity'
                                        name="printers_quantity"
                                        onChange={this.handleInputChangeFor("printers_quantity")}
                                        value={this.state.printers_quantity}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label='Tablet Stand Quantity'
                                        name="tablet_stands_quantity"
                                        onChange={this.handleInputChangeFor("tablet_stands_quantity")}
                                        value={this.state.tablet_stands_quantity}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleSave}>
                                <Icon name='checkmark' />Add Location
                            </Button>
                        </Modal.Actions>
                    </Modal>
            </Container>
            <div className="admin-individual-store-container">
                <Grid>
                    <Grid.Column width={5}>
                        <Form>
                            <Form.Field>
                                <Header as='h3'>Store Name</Header>
                                    {this.state.edit ?
                                        <Input name='store_name' value={this.state.store_name} onChange={this.handleChange}></Input>
                                    :
                                        <p>{this.props.store.store_name}</p>
                                    }
                            </Form.Field>
                            <Form.Field>
                                <Header as='h3'>Store Status</Header>
                                {this.state.edit ?
                                    <select name='store_status' value={this.state.store_status} onChange={this.handleChange}>
                                        <option value = 'Lead'>Lead</option>
                                        <option value = 'Prospect'>Prospect</option>
                                        <option value = 'Opportunity'>Opportunity</option>
                                        <option value = 'Customer'>Customer</option>
                                        <option value = 'Past Customer'>Past Customer</option>
                                        <option value = 'Junk Opportunity'>Junk Opportunity</option>
                                        <option value = 'Junk Prospect'>Junk Prospect</option>
                                    </select>
                                :
                                    <p>{this.props.store.store_status}</p>
                                }
                            </Form.Field>
                            <Form.Field>
                                <Header as='h3'>User ID</Header>
                                {this.state.edit ?
                                    <select className='user-id' name='user_id' value={this.state.user_id} onChange={this.handleChange}>
                                        {this.props.userlist.map(user => {
                                            return(<option key = {user.id} value = {user.id}>{user.username}</option>)
                                        })}
                                    </select>
                                :
                                    <p>{this.props.store.user_id}</p>
                                }
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Form>
                            <Form.Field>
                                <Header as='h3'>Customer Email</Header>
                                {this.state.edit ?
                                    <Input name='customer_email' value={this.state.customer_email} onChange={this.handleChange}></Input>
                                :
                                    <p>{this.props.store.customer_email}</p>
                                }
                            </Form.Field>
                            <Form.Field>  
                                <Header as='h3'>Date Joined</Header>
                                {this.state.edit ?
                                    <Input name='date_joined' value={this.state.date_joined} onChange={this.handleChange}></Input>
                                :
                                    <Moment format="YYYY/MM/DD">{this.props.store.date_joined}</Moment>
                                }
                            </Form.Field>
                            <Form.Field>
                                <Header as='h3'>Business Type</Header>
                                {this.state.edit ?
                                    <select name='business_type' value={this.state.business_type} onChange={this.handleChange}>
                                        <option valiue = 'Ag Co-op'>Ag Co-op</option>
                                        <option value = 'Food Co-op'>Food Co-op</option>
                                        <option value = 'Meat Market'>Meat Market</option>
                                        <option value = 'Ethnic Grocer'>Ethnic Grocer</option>
                                        <option value = 'Organic/Health Foods'>Organic/Health Foods</option>
                                        <option value = 'Caterer'>Caterer</option>
                                    </select>
                                    :
                                    <p>{this.props.store.business_type}</p>
                                }
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Form>
                            <Form.Field>
                                {/* <Header as='h3'>Contract</Header> */}
                                <h3>Contract</h3>
                                {this.state.edit ?

                                // After presentation, uncomment the below line. 
                                    // <this.MyUploader />

                                // After presentation, delete Dropzone.
                                    <Dropzone onDrop={this.onDrop}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="dropzone-style">
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Upload Contract</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                // End after presentation, delete Dropzone.
                                    :
                                        <ViewContract
                                            file={file}
                                            type={type} />
                                }
                            </Form.Field>
                            <Form.Field>
                                <h3>MoonClerk URL</h3>
                                {this.state.edit ?
                                    <Input name='moonclerk_url' value={this.state.moonclerk_url} onChange={this.handleChange}></Input>
                                    :
                                    <p>{this.props.store.moonclerk_url}</p>
                                }
                            </Form.Field>
                            <Form.Field>
                                <Header as='h3'>Customer Active?</Header>
                                    {this.state.edit ?
                                        <select name='active_customer' value={this.state.active_customer} onChange={this.handleChange}>
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                        :
                                        <p>{String(this.props.store.active_customer)}</p>
                                    }
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Row className='notes-row' width={16}>
                        <Form>
                            <Form.Field>
                                    <Header as='h3'>Notes</Header>
                                    {this.state.edit ?
                                        <TextArea name='notes' value={this.state.notes} onChange={this.handleChange}></TextArea>
                                        :
                                        <p>{this.props.store.notes}</p>
                                    }
                            </Form.Field>
                        </Form>    
                    </Grid.Row>
                    <Grid.Row width={16}>
                        <Container>
                            <Button className='back' onClick={this.goBack}>Back</Button>
                            {this.state.edit ?
                                <Button onClick={this.submitChanges}>Submit</Button>
                                :
                                <Button onClick={this.toggleEdit}>Edit</Button>
                            }
                        </Container>
                    </Grid.Row>
                </Grid>
            </div> 
            </div>
        )
    }
}

const store = reduxState => ({
    store: reduxState.individualStoreReducer,
    userlist: reduxState.adminUserReducer,
    reduxState
})

export default connect(store)(AdminIndividualStore);