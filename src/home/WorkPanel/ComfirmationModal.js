import React from 'react';
import styled from 'styled-components';
import { Modal,Icon } from 'semantic-ui-react';
import { ConfirmationButton  } from '../../components/Buttons';
import Alignment from '../../components/Alignment';


const StyledHeader = styled.div`
    font-size: ${p=>p.theme.fontSizeMedium};
    font-family: 'Montserrat';
    color: ${ p=>p.theme.colorBlue}
`;
const ModalContent = styled.div`
    font-size: ${p=>p.theme.fontSizeBasic};
    font-family: 'Montserrat';
`;

class ConfirmationModal extends React.Component{
    render(){
    const { content } = this.props;
    return (
        <Modal size='tiny' dimmer='inverted'  trigger={this.props.children}         
        open={this.props.modalOpen}
      >
            <Modal.Header><StyledHeader>Are you sure ?</StyledHeader></Modal.Header>
            <Modal.Content>
                <ModalContent>
                    {content}
                </ModalContent>
            </Modal.Content>
            <Modal.Actions>
                <Alignment horizontal="flex-end">
                        <ConfirmationButton onClick={this.props.handleReject}>
                            <Icon name='remove' /> Cancel
                        </ConfirmationButton>
                        <ConfirmationButton positive onClick={this.props.handleAccept} >
                            <Icon name='checkmark' /> Confirm
                        </ConfirmationButton>
                </Alignment>
            </Modal.Actions>
        </Modal>
    )}
}


export default ConfirmationModal