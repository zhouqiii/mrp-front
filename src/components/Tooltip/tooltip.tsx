// antd table 单元格ellipsis设置的默认提示样式不满意，自定义tooltip
export const tooltipshow = ({
  title = '',
  content = '',
  isDefault = true,
}: {
  title: string
  content: string
  isDefault?: boolean
}) => (
  <a-tooltip placement="topLeft" title={title}>
    {isDefault ? content : ''}
  </a-tooltip>
)
