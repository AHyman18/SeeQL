import * as React from 'react';
import styled from 'styled-components';
import SettingsPanel from '../components/sidepanels/SettingsPanel';
import FavoritesPanel from '../components/sidepanels/FavoritesPanel';
import InfoPanel from '../components/sidepanels/InfoPanel';
import * as actions from '../actions/actions';
interface IPanelWrapperProps {
  sidePanelVisibility: boolean;
}

interface IIndTabProps {
  active: string;
  panel: string;
}

const PanelWrapper = styled.div<IPanelWrapperProps>`
  visibility: ${({ sidePanelVisibility }) =>
    sidePanelVisibility ? 'visible' : 'collapse'};
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: visibility 500ms ease-in-out;
`;
const ButtonMenu = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e8ecf1;
`;

const IndTab = styled.button<IIndTabProps>`
  border: none;
  font-family: 'Poppins', sans-serif;
  border: none;
  padding: 5px;
  background-color: ${props =>
    props.active === props.panel ? '#e8ecf1' : '#fdfdfe'}
  
  :hover {
    font-weight: bold;
  }
  :focus {
    outline: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 50px 0px 5px 5px;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
`;

interface IForeignKeysAffected {
  column: string;
  table: string;
}

interface IColumnsMetaData {
  characterlength?: string;
  columnname: string;
  datatype: string;
  defaultvalue: string;
}

interface IAcitveTableInPanel {
  columns?: IColumnsMetaData[];
  foreignKeys?: IForeignKeysAffected[];
  primaryKey?: string;
  table_name?: string;
  foreignKeysOfPrimary?: any;
}

interface IDispatchSidePanelDisplayAction {
  type: string;
}

interface Props {
  activeTableInPanel: IAcitveTableInPanel;
  sidePanelVisibility: boolean;
  activePanel: string;
  dispatchSidePanelDisplay: (IDispatchSidePanelDisplayAction) => any;
}

const SidePanel: React.SFC<Props> = ({
  activeTableInPanel,
  sidePanelVisibility,
  activePanel,
  dispatchSidePanelDisplay
}) => {
  return (
    <React.Fragment>
      {sidePanelVisibility && (
        <PanelWrapper sidePanelVisibility={sidePanelVisibility}>
          <ButtonMenu>
            <Tabs>
              <IndTab
                data-panel="info"
                panel="info"
                active={activePanel}
                onClick={() =>
                  dispatchSidePanelDisplay(actions.changeToInfoPanel())
                }
              >
                Table Info
              </IndTab>
              <IndTab
                data-panel="favorites"
                panel="favorites"
                active={activePanel}
                onClick={() =>
                  dispatchSidePanelDisplay(actions.changeToFavPanel())
                }
              >
                Favorites
              </IndTab>
              <IndTab
                data-panel="settings"
                panel="settings"
                active={activePanel}
                onClick={() =>
                  dispatchSidePanelDisplay(actions.changeToSettingsPanel())
                }
              >
                Settings
              </IndTab>
            </Tabs>
          </ButtonMenu>
          <div>
            {activePanel === 'info' && (
              <InfoPanel
                sidePanelVisibility={sidePanelVisibility}
                activeTableInPanel={activeTableInPanel}
              />
            )}
            {activePanel === 'favorites' && <FavoritesPanel />}
            {activePanel === 'settings' && <SettingsPanel />}
          </div>
        </PanelWrapper>
      )}
    </React.Fragment>
  );
};

export default SidePanel;