import { useContext } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SSRContextData } from '../../../entry-server'

interface SSRLinkProps {
  to: string
  className?: string
  children: ReactNode
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Custom Link component that works in both SSR and client contexts.
 * During SSR, renders as an <a> tag (navigation not supported on server).
 * On client, uses React Router's Link component.
 */
export function SSRLink({ to, className, children, ...props }: SSRLinkProps) {
  const ssrContext = useContext(SSRContextData)

  if (ssrContext) {
    return (
      <a href={to} className={className} data-discover="true" {...props}>
        {children}
      </a>
    )
  }

  return (
    <RouterLink to={to} className={className} {...props}>
      {children}
    </RouterLink>
  )
}
