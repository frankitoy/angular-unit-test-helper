import { Component } from '@angular/core'
import camelToKebabCase from 'camel-to-kebab'
import { __decorate } from 'tslib'

export function createComponentMock(
  className: string,
  selectorName?: string,
  template = ''
) {
  if (!className || !className.endsWith('Component')) {
    throw new Error(
      'Expected class name to end with Component, but it did not. Provide a valid component class name.'
    )
  }

  if (!selectorName) {
    selectorName = inferSelectorName(className)
  }

  const newClass: any = (getWindow()[className] = () => {})
  return __decorate([Component({ selector: selectorName, template })], newClass)
}

function getWindow(): any {
  if (typeof window === 'undefined') {
    return {}
  }
  return window
}

function inferSelectorName(className: string) {
  className = className.replace('Component', '')
  className = camelToKebabCase(className)
  return `app-${className}`
}
