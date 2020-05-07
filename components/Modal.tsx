import * as React from "react";
import {
  Animated,
  BackHandler,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  SafeAreaView,
} from "react-native";

type Props = {
  /**
   * Determines whether clicking outside the modal dismiss it.
   */
  dismissable?: boolean;
  /**
   * Callback that is called when the user dismisses the modal.
   */
  onDismiss?: () => void;
  /**
   * Determines Whether the modal is visible.
   */
  visible: boolean;
  /**
   * Content of the `Modal`.
   */
  children: React.ReactNode;
  /**
   * Style for the content of the modal
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
};

type State = {
  opacity: Animated.Value;
  rendered: boolean;
};

const DEFAULT_DURATION = 220;

class Modal extends React.Component<Props, State> {
  static defaultProps = {
    dismissable: true,
    visible: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.visible && !prevState.rendered) {
      return {
        rendered: true,
      };
    }

    return null;
  }

  state = {
    opacity: new Animated.Value(this.props.visible ? 1 : 0),
    rendered: this.props.visible,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }

  private handleBack = () => {
    if (this.props.dismissable) {
      this.hideModal();
    }
    return true;
  };

  private showModal = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    BackHandler.addEventListener("hardwareBackPress", this.handleBack);

    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1.0 * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  private hideModal = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);

    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 0,
      duration: 1 * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        return;
      }

      if (this.props.visible && this.props.onDismiss) {
        this.props.onDismiss();
      }

      if (this.props.visible) {
        this.showModal();
      } else {
        this.setState({
          rendered: false,
        });
      }
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
  }

  render() {
    const { rendered, opacity } = this.state;

    if (!rendered) return null;

    const { children, dismissable } = this.props;
    return (
      <Animated.View
        pointerEvents={this.props.visible ? "auto" : "none"}
        accessibilityViewIsModal
        accessibilityLiveRegion="polite"
        style={StyleSheet.absoluteFill}
      >
        <TouchableWithoutFeedback
          disabled={!dismissable}
          onPress={dismissable ? this.hideModal : undefined}
        >
          <Animated.View
            style={[
              styles.backdrop,
              { backgroundColor: "rgba(0,0,0,0.28)", opacity },
            ]}
          />
        </TouchableWithoutFeedback>
        <SafeAreaView style={styles.wrapper} pointerEvents="box-none">
          {children}
        </SafeAreaView>
      </Animated.View>
    );
  }
}

export default Modal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "transparent",
    justifyContent: "center",
  },
});
