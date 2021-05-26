<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    menuIcon: {
      type: String,
      default: ""
    },
    menuName: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title, menuIcon, menuName } = context.props;
    const vnodes = [];

    if (menuIcon) {
      vnodes.push(<img style="width: 15px;" src={menuIcon} />);
    } else if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (menuName) vnodes.push(<span slot="title">{menuName}</span>);
    else if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
