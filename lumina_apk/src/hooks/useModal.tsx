import React, { useMemo, useState, type PropsWithChildren } from "react";
import { Modal as RNModal, StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "src/constants/colors";
import { createStyles } from "src/helpers/style";

type ModalProps = PropsWithChildren<{
  useCenter: boolean;
  enablePending: boolean;
  enableClickClose: boolean;
  onClose: () => void;
}>;

export default function useModal(props?: Partial<ModalProps>) {
  const { children, useCenter = true, enablePending = false, enableClickClose = false, onClose } = props || {};
  const [visible, setVisible] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(enablePending);

  console.log("useModal - render");

  // TEMP 解决父级组件更新，子级组件状态不更新问题(父组件传递的值没有再次触发useState的初始挂载)，可用useMemo
  // useEffect(() => {
  //   console.log("useModal - useEffect");
  //   if (!(enablePending === pending)) {
  //     setPending(enablePending);
  //   }
  // }, [enablePending]);

  // 状态栏控制
  useMemo(() => {
    console.log("useModal - useMemo");
    StatusBar.setBarStyle(visible ? "light-content" : "dark-content");
  }, [visible]);

  // 显示控制
  const toggleVisible = (_visible?: boolean) => {
    _visible === undefined ? setVisible(!visible) : setVisible(_visible);
  };
  const togglePending = (_pending?: boolean) => {
    _pending === undefined ? setPending(!pending) : setPending(_pending);
  };

  // 点击关闭
  const onClickClose = () => {
    if (enableClickClose) {
      toggleVisible(false);
    }
  };

  // 渲染节点
  const renderNode = () => {
    if (pending) {
      return <ActivityIndicator size="large" color={colors.mid_primary} />;
    }
    if (children) return children;

    return null;
  };

  // 模态
  const Modal = () => {
    return (
      <RNModal
        visible={visible}
        statusBarTranslucent={true}
        transparent={true}
        onRequestClose={() => toggleVisible()}
        onDismiss={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.container, (pending || useCenter) && styles.useCenter]}
          onPress={onClickClose}>
          {renderNode()}
        </TouchableOpacity>
      </RNModal>
    );
  };

  return { Modal, toggleVisible, togglePending };
}

const styles = createStyles({
  container: {
    flex: 1,
    backgroundColor: colors.modal,
  },
  useCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
