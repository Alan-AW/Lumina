/**
 * 全局模版组件，主要显示左侧导航，顶部header信息
 */
import { Layout } from 'antd'
import NavBar from './siderMenu'
import RightContent from './content'
import ThemeColor from './themeColor'

const AdminLayout = () => {
  return (
    <Layout>
      <NavBar />
      <RightContent />
      <ThemeColor />
    </Layout>
  );
};
export default AdminLayout;
