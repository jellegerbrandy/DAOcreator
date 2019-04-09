import * as R from "ramda"
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { bindActionCreators, Dispatch } from "redux"
import {
  VotingMachine,
  votingMachines,
  VotingMachineConfiguration,
  Scheme,
  schemes,
} from "../../../lib/integrations/daoStack/arc"
import * as React from "react"
import { connect } from "react-redux"
import DAOcreatorActions, * as daoCreatorActions from "../../../redux/actions/daoCreator"

interface Props extends WithStyles<typeof styles> {
  schemes: { scheme: Scheme; votingMachineConfig: VotingMachineConfiguration }[]
  actions: DAOcreatorActions
}

interface State {
  expanded: string | null
}

class SchemesStep extends React.Component<Props, State> {
  public readonly state: State = {
    expanded: null,
  }

  constructor(props: Props) {
    super(props)
  }

  handleChange = (panel: any) => (event: any, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              General settings
            </Typography>
            <Typography className={classes.secondaryHeading}>
              I am an expansion panel
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
              You are currently not an owner
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

// STYLE
const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })

const componentWithStyles = withStyles(styles)(SchemesStep)

// STATE
const mapStateToProps = (state: any) => {
  return {
    schemes: state.daoCreator.schemes,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(daoCreatorActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles)
