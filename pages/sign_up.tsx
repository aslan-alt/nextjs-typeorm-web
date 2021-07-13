import axios from 'axios'
import { NextPage } from 'next'
import { useForm } from 'hooks/useForm'
import { Modal, message } from 'antd';
import qs from 'querystring'
import StarsLayout from 'components/StarsLayout'


const SignUp: NextPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const { form } = useForm({
        initFormData: { username: '', password: '', passwordConfirmation: '' },
        submit: {
            request: (fromData) => axios.post('/api/users', fromData),
            success: (res, commitData) => {

                modal.confirm({
                    title: '注册成功',
                    content: (
                        <div>
                            <p>恭喜您成为第{res?.data?.id}位用户！！！</p>
                            <p>点击确定返回留言页面</p>
                            <p>点击取消返回首页</p>
                        </div>
                    ),
                    onOk: () => {
                        const { username, password } = commitData
                        axios.post('/api/sessions', { username, password }).then(res => {
                            const query = qs.parse(window.location.search.substr(1))
                            location.href = query.returnTo?.toString() || '/'
                        }).catch(res => {
                            console.log('-------fff')
                            console.log(res)
                            message.error('登陆失败，请检查网络')
                        })

                    },
                    okText: '返回留言页',
                    cancelText: '返回首页',
                    onCancel: () => {
                        location.href = '/'
                    }
                })
            }
        },
        fields: [
            { label: '用户名', key: 'username', type: 'text' },
            { label: '密码', key: 'password', type: 'text' },
            { label: '确认密码', key: 'passwordConfirmation', type: 'text' }
        ],
        buttonText: '注册'
    })
    return (
        <StarsLayout>
            <div>
                {form}
                {contextHolder}
            </div>
        </StarsLayout>
    )
}
export default SignUp