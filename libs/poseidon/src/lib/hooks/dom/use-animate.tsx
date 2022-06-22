import { useEffect, useState, RefObject } from 'react'

// Génération des keyframes grace à la futur Web Animation IDE
// https://github.com/bawdeveloppement/web-animator
interface animationProps {
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  timing: number | KeyframeAnimationOptions | undefined
}

export const useAnimate = (ref: RefObject<HTMLElement>, { keyframes, timing }: animationProps) => {
    const [ animation, setAnimation ] = useState<Animation | null>()

    useEffect(() => {
      const currentRef = ref.current;
      setAnimation(currentRef && currentRef.animate(keyframes, timing ))
      return () => {
        currentRef && currentRef.getAnimations().forEach((a) => a.cancel())
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return animation
}

export default useAnimate
