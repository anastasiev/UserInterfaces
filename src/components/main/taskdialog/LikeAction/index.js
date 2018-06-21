import React, { Component } from 'react';
import Styles from './styles.scss';
import TagsSearch from "../TagsSearch";
import LocationsSearch from "../LocationsSearch";
import UserRelationSearch from "../UserRelationSearch";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeMediaNumber, clearSearch} from "../../../../actions/search";
import {ActionType} from "../../../../helper/tasksprops";
import {disableCreateButton} from "../../../../actions/main";
import {MenuItem, SelectField} from "material-ui";


class LikeAction extends Component{
    state = {
        active: 'tags',
        postNumber: 1
    };

    handleClick = (e, searchType) => {
        if( this.state.active !== searchType ) {
            this.setState({
                active: searchType
            });
            this.props.clearSearch(ActionType.LIKE);
            this.props.disableCreateButton();
        }
    };
    handlePostNumberChange = (event, index, value) => {
        this.setState({
            postNumber: value
        });
        this.props.changeMediaNumber(value);

    };

    render () {
        const { active } = this.state;
        return (
            <section className = {Styles.LikeAction}>
                <section className={Styles.General}>
                    <h1>General</h1>
                    <div className={Styles.Select}>
                        <SelectField
                            value={this.state.postNumber}
                            onChange={this.handlePostNumberChange}
                            floatingLabelText="Post number which will be liked"
                            fullWidth={true}
                            floatingLabelStyle={{color: '#3897f0'}}
                            selectedMenuItemStyle={{color: '#3897f0'}}
                        >
                            {
                                [
                                    <MenuItem key={1} value={1} primaryText="1 post" />,
                                    <MenuItem key={2} value={2} primaryText="2 posts" />,
                                    <MenuItem key={3} value={3} primaryText="3 posts" />
                                ]
                            }

                        </SelectField>
                    </div>

                </section>
                <div onClick={e => this.handleClick(e, 'tags')} >
                    <TagsSearch active={active === 'tags'}/>
                </div>
                <div onClick={e => this.handleClick(e, 'locations')}>
                    <LocationsSearch active={active === 'locations'}/>
                </div>
                <div onClick={e => this.handleClick(e, 'relations')}>
                    <UserRelationSearch active={active === 'relations'}/>
                </div>
            </section>
        )
    }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        clearSearch,
        disableCreateButton,
        changeMediaNumber
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(LikeAction)