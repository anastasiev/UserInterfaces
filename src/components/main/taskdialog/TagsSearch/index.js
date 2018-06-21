import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Map } from "immutable";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import Styles from './styles.scss';
import { tagColor } from '../../../../helper/colors'
import SearchParamView from "../../tasktable/SearchParamView";
import {disableCreateButton, enableCreateButton} from "../../../../actions/main";
import {setTags} from "../../../../actions/search";


class TagsSearch extends Component{
    state = {
        items: [],
        tag: '',
        errorText: '',
        errorStyle: {
            color: '#ff0000'
        },
        buttonStyle: {
            float: 'right',
            marginRight: '22%',
            marginTop: '6%'
        },
        currentTags: 0,
        maxTags: 3
    };
    changeHandler = (e, newValue) => {
        this.setState({
            tag: newValue,
            errorText: '',
            errorStyle: {
                color: '#ff0000',
                display: 'inline'
            },
            disabled: false
        });
    };
    clickHandler = () => {
        const { tag, currentTags, maxTags, items } = this.state;
        if(tag.length === 0) {
            this.setState({
                errorText: 'Enter hash tag name',
            });
            return;
        }
        if(items.includes(tag)) {
            this.setState({
                errorText: `Tag '${tag}' already typed`,
            });
            return;
        }

        this.setState(prev => {
            return {
                items: [...prev.items, tag],
                tag: '',
                currentTags: currentTags + 1,
                disabled: currentTags + 1 === maxTags
            }
        });
        this.props.setTags([...items, tag]);
        this.props.enableCreateButton();
    };
    removeTagHandler = (e, tag) => {
        this.setState(prev => {
            const newItems = prev.items.filter(i => i !== tag);
            if(newItems.length === 0) {
                this.props.disableCreateButton();
                this.props.setTags(null);
            } else {
                this.props.setTags(newItems);
            }
            return {
                items: newItems,
                currentTags: prev.currentTags - 1,
                disabled: prev.currentTags - 1 === prev.maxTags,
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
            this.props.setTags(items);
            this.props.enableCreateButton();
        }
    }

    render () {
        const { active } = this.props;
        const { items, tag, errorText, errorStyle, buttonStyle, currentTags, maxTags } = this.state;
        let { disabled } = this.state;
        disabled = !active ? true : disabled;
        return (
            <section className = {`${Styles.TagsSearch} ${active || Styles.Disabled}`}>
                <div className={Styles.Header}>
                    <h1>Hash tags<i className={`${Styles.Tag} material-icons`}>#</i></h1>
                    <span className={Styles.Counter}>{`${currentTags}/${maxTags}`}</span>
                </div>
                {
                    items.length > 0 &&
                    <div className={Styles.Items}>
                        <h2>Added tags: </h2><SearchParamView withRemove={true} handler={this.removeTagHandler} search={Map({tags : items})}/>
                    </div>
                }

                <div className={Styles.Body}>
                    <TextField
                        hintText="Example: food"
                        floatingLabelText="Type hash tags"
                        floatingLabelStyle={{color: tagColor}}
                        floatingLabelFocusStyle={{color: tagColor}}
                        underlineFocusStyle={{borderColor: tagColor}}
                        disabled={disabled}
                        floatingLabelFixed={true}
                        onChange={this.changeHandler}
                        value={tag}
                        errorText={errorText}
                        errorStyle={errorStyle}
                    />
                    <RaisedButton label="ADD"
                                  labelColor='#5D4037'
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
        setTags
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(TagsSearch)