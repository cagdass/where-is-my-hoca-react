import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import departmentService from "../schedule_service.js";

class BuildingDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props.params);
        departmentService.buildingDetails(this.props.params.id).then(classrooms => {
            this.setState({classrooms});
            this.setDistinctClassrooms();
        })
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    renderClassroom(classroom){
        return <div>
            <Link to={"/classroom/" + classroom}>{classroom}</Link>
            <br/>
        </div>
    }

    setDistinctClassrooms(){
        let {classrooms = []} = this.state;
        var distinctClassrooms = [];

        let building = this.props.params.id;

        for(var i = 0; classrooms && i < classrooms.length; i++){
            var lectures = classrooms[i].lectures;
            for(var j = 0; lectures && j < lectures.length; j++){
                var classroom = lectures[j].location;
                if(classroom != '' && building === classroom.slice(0, building.length) && distinctClassrooms.indexOf(classroom) == -1){
                    distinctClassrooms.push(classroom);
                }
            }
        }

        this.setState({"distinctClassrooms": distinctClassrooms.sort()})

    }

    render() {
        let {classrooms = [], distinctClassrooms = []} = this.state;
        console.log(classrooms.lectures);
        return (<Table striped condensed hover>
            <thead>
                <tr>
                    <th>Classrooms</th>
                </tr>
            </thead>
            <tbody>
                {distinctClassrooms.map(this.renderClassroom.bind(this))}
            </tbody>
        </Table>);
    }
}

BuildingDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default BuildingDetails;
