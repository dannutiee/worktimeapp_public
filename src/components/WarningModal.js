import React from 'react';
import styled from 'styled-components';
import { Modal, Icon } from 'semantic-ui-react';
import { ConfirmationButton } from '../components/Buttons';
import Alignment from '../components/Alignment';

const StyledHeader = styled.div`
  font-size: ${p => p.theme.fontSizeMedium};
  font-family: 'Montserrat';
  color: ${p => p.theme.colorBlue};
`;
const ModalContent = styled.div`
  font-size: ${p => p.theme.fontSizeBasic};
  font-family: 'Montserrat';
`;
const StrongFont = styled.span`
  color: ${p => p.theme.colorBlue};
`;

class WarningModal extends React.Component {
  render() {
    const { onClose, warningModalOpen, content } = this.props;
    return (
      <Modal
        trigger={this.props.children}
        open={warningModalOpen}
        size="tiny"
        dimmer="inverted"
      >
        <Modal.Header>
          <StyledHeader>Work is not started</StyledHeader>
        </Modal.Header>
        <Modal.Content>
          <ModalContent>{content}</ModalContent>
        </Modal.Content>
        <Modal.Actions>
          <Alignment horizontal="flex-end">
            <ConfirmationButton positive onClick={onClose}>
              <Icon name="checkmark" /> OK
            </ConfirmationButton>
          </Alignment>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default WarningModal;
