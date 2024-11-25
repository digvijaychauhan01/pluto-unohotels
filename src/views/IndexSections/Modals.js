
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";

class Modals extends React.Component {
  state = {};
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  render() {
    return (
      <>
        <Row>
          <Col md="12">
            <Button
              className="pr-2 pl-2 pt-1 pb-1"
              block
              color="black"
              type="button"
              onClick={() => this.toggleModal("formModal")}
              style={{ background: "#fff", color: "#000" ,border:"1px"}}
            >
              Query Now
            </Button>
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div
                      style={{ background: "#000" }}
                      className="text-muted text-center p-2"
                    >
                      <h4 style={{ fontSize: "16px", color: "#fff" }}>
                        Query Now For Your Dream Hospitality
                      </h4>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-2">
                    <div className="text-center text-muted mb-4">
                      <small>
                        Business Hotels | Holiday Destinations | Destination
                        Weddings | Honeymoon Destinations | Historic Sites
                      </small>
                    </div>

                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.passwordFocused,
                      })}
                    >
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Enter Your Name"
                          type="text"
                          autoComplete="off"
                          onFocus={(e) =>
                            this.setState({ passwordFocused: true })
                          }
                          onBlur={(e) =>
                            this.setState({ passwordFocused: false })
                          }
                        />
                      </InputGroup>
                    </FormGroup>

                    <Form role="form" action="" method="post">
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.emailFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter Email"
                            type="email"
                            onFocus={(e) =>
                              this.setState({ emailFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ emailFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.passwordFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Contact No"
                            type="number"
                            autoComplete="off"
                            onFocus={(e) =>
                              this.setState({ passwordFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ passwordFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.passwordFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <Input
                            placeholder="Hotel Destination"
                            type="text"
                            autoComplete="off"
                            onFocus={(e) =>
                              this.setState({ passwordFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ passwordFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                      <div>
                        <Button
                          style={{ background: "#000" }}
                          className="w-100 my-4"
                          color="primary"
                          type="button"
                        >
                          Query Now
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Modals;
