

import { Helmet } from "react-helmet"

type HeadProps = {
  title: string
}

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Head