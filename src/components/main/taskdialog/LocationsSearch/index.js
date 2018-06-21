import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Styles from './styles.scss';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Map} from "immutable";
import SearchParamView from "../../tasktable/SearchParamView";
import { locationColor } from '../../../../helper/colors'
import {disableCreateButton, enableCreateButton} from "../../../../actions/main";
import {setLocations} from "../../../../actions/search";




class LocationsSearch extends Component{
    state = {
        items: [],
        location: '',
        errorText: '',
        errorStyle: {
            color: '#ff0000'
        },
        buttonStyle: {
            float: 'right',
            marginRight: '22%',
            marginTop: '6%'
        },
        currentLocations: 0,
        maxLocations: 3
    };
    changeHandler = (e, newValue) => {
        this.setState({
            location: newValue,
            errorText: '',
            errorStyle: {
                color: '#ff0000',
                display: 'inline'
            },
            disabled: false
        });
    };
    clickHandler = () => {
        const { location, currentLocations, maxLocations, items } = this.state;
        if(location.length === 0) {
            this.setState({
                errorText: 'Enter location name',
            });
            return;
        }
        if(items.includes(location)) {
            this.setState({
                errorText: `Location '${location}' already typed`,
            });
            return;
        }
        this.setState(prev => {
            return {
                items: [...prev.items, prev.location],
                location: '',
                currentLocations: currentLocations + 1,
                disabled: currentLocations + 1 === maxLocations
            }
        });
        this.props.setLocations([...items, location]);
        this.props.enableCreateButton();

    };
    removeLocationHandler = (e, location) => {
        this.setState(prev => {
            const newItems = prev.items.filter(i => i !== location);

            if(newItems.length === 0) {
                this.props.disableCreateButton();
                this.props.setLocations(null);
            } else {
                this.props.setLocations(newItems);
            }
            return {
                items: newItems,
                currentLocations: prev.currentLocations - 1,
                disabled: prev.currentLocations - 1 === prev.maxLocations,
                errorText: '',
                errorStyle: {
                    color: '#ff0000',
                    display: 'inline'
                }
            }
        });
    };
    componentDidUpdate(prevProps){
        const { active: prevActive } = prevProps;
        const { active: currentActive } = this.props;
        const { items } = this.state;
        if( prevActive === false && currentActive === true && items.length > 0 ) {
            this.props.setLocations(items);
            this.props.enableCreateButton();
        }
    }
    render () {
        const { active } = this.props;
        const { items, location, errorText, errorStyle, buttonStyle, currentLocations, maxLocations } = this.state;
        let { disabled } = this.state;
        disabled = !active ? true : disabled;
        return (
            <section className = {`${Styles.LocationsSearch} ${active || Styles.Disabled}`}>
                <div className={Styles.Header}>
                    <h1>Locations<i className={`${Styles.Tag} material-icons`}>location_on</i></h1>
                    <span className={Styles.Counter}>{`${currentLocations}/${maxLocations}`}</span>
                </div>
                {
                    items.length > 0 &&
                    <div className={Styles.Items}>
                        <h2>Added locations: </h2><SearchParamView withRemove={true} handler={this.removeLocationHandler} search={Map({locations : items})}/>
                    </div>
                }
                <div className={Styles.Body}>
                    <TextField
                        hintText="Example: California"
                        floatingLabelText="Type locations"
                        floatingLabelStyle={{color: locationColor}}
                        floatingLabelFocusStyle={{color: locationColor}}
                        underlineFocusStyle={{borderColor: locationColor}}
                        disabled={disabled}
                        floatingLabelFixed={true}
                        onChange={this.changeHandler}
                        value={location}
                        errorText={errorText}
                        errorStyle={errorStyle}
                    />
                    <RaisedButton label="ADD"
                                  labelColor='#3897f0'
                                  style={buttonStyle}
                                  disabled={disabled}
                                  onClick={this.clickHandler}
                                  disabledLabelColor={'rgba(0, 0, 0, 0.3)'}
                    />
                </div>
            </section>
        )
    }

}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        disableCreateButton,
        enableCreateButton,
        setLocations
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(LocationsSearch)