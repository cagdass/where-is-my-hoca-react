import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service"

class DepartmentList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchDepartments(searchParams, orderParams, pager).then(() => this.setState({isLoaded: true}));
    }

    searchDepartments() {
        return scheduleService.findDistinctDepartments()
            .then(departments => {
                this.setState({"departments": departments.sort()});

            })
            .catch(searchError => this.setState({searchError}));
    }

    renderDepartment(department, index) {
        return <span>
                <Col xs={3} className="searchCol"><Link to={`/department/${department}`}>{department}</Link></Col>
            </span>
    }

    render() {
        let {departments = []} = this.state;
        return ( <div>
            <Row>
              <Col xs={40} sm={40} md={12}>
                  <Table>
                      <thead>
                      <tr>
                          <th>Departments</th>
                      </tr>
                      </thead>
                      <tbody>
                      {departments.map(this.renderDepartment.bind(this))}
                      </tbody>
                  </Table>
              </Col>
            </Row>
          </div>
       );
    }
}

DepartmentList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default DepartmentList;
