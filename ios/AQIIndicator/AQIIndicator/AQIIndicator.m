//
//  AQIIndicator.m
//  AQIIndicator
//
//  Created by maciaszk on 01/11/16.
//  Copyright © 2016 Note B. All rights reserved.
//

#import "AQIIndicator.h"

@implementation AQIIndicator
{
    float progress;
    int score;
    float thickness;
    NSArray *bgColors;

}

- (instancetype)initWithFrame:(CGRect)frame
{
    if ((self = [super initWithFrame:frame])) {
        self.opaque = NO;
    }
    
    thickness = 15;
    
    bgColors = [NSArray arrayWithObjects:(id)[UIColor colorWithRed: 1. green: 1. blue:1. alpha:.15].CGColor, (id)[UIColor colorWithRed:1. green:1. blue:1. alpha:.4].CGColor, nil];
    
    return self;
}

- (void)setProgress:(float)p
{
    progress = p;
    [self setNeedsDisplay];
}

- (void)setScore:(int)s
{
    score = s;
    [self setNeedsDisplay];
}

- (void)setThickness:(float)t
{
    thickness = t;
    [self setNeedsDisplay];
}

- (void)drawRingInRect:(CGRect)rect thickness:(CGFloat)thickness startAngle:(CGFloat)startAngle endAngle:(CGFloat)endAngle colors:(NSArray*)colors
{
    CAShapeLayer *layer = [[CAShapeLayer alloc] init];
    layer.fillColor = [UIColor colorWithWhite:1.0 alpha:0.0].CGColor;

    CGContextRef context = UIGraphicsGetCurrentContext();
    int strokeOffset = thickness / 2;
    CGRect pathRect = CGRectMake(strokeOffset, strokeOffset, rect.size.width - thickness, rect.size.height - thickness);
    
    UIBezierPath *path = [UIBezierPath bezierPathWithArcCenter:CGPointMake(rect.size.width / 2, rect.size.height / 2) radius:rect.size.width / 2 - strokeOffset startAngle:startAngle endAngle:endAngle clockwise:true];

    layer.path = path.CGPath;
    
    CGPathRef strokedPath = CGPathCreateCopyByStrokingPath(path.CGPath, nil, thickness, kCGLineCapButt, kCGLineJoinMiter, 0);
    CGContextAddPath(context, strokedPath);
    CGContextClip(context);
    
    CGFloat locations[2];
    locations[0] = 0.2;
    locations[1] = 0.8;
    
    CGGradientRef gradient = CGGradientCreateWithColors(
                                                        CGColorSpaceCreateDeviceRGB(),
                                                        (CFArrayRef)colors,
                                                        locations
                                                        );
    CGContextDrawLinearGradient(
                                context,
                                gradient,
                                CGPointMake(0, 0),
                                CGPointMake(rect.size.width, rect.size.height),
                                0
                                );
    
    [self.layer addSublayer:layer];
}

- (NSArray *)getColorsForScore:(int)s
{
    switch (s) {
        case 2:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed:0.65 green:1.00 blue:0.00 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.58 green:0.90 blue:0.00 alpha:1.0].CGColor, nil];

        case 3:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed:0.90 green:1.00 blue:0.00 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.81 green:0.90 blue:0.00 alpha:1.0].CGColor, nil];
            
        case 4:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed:1.00 green:0.78 blue:0.00 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.90 green:0.71 blue:0.00 alpha:1.0].CGColor, nil];
            
        case 5:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed:0.89 green:0.35 blue:0.00 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.79 green:0.31 blue:0.00 alpha:1.0].CGColor, nil];
            
        case 6:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed:0.55 green:0.00 blue:0.00 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.45 green:0.00 blue:0.00 alpha:1.0].CGColor, nil];
            
        default:
            return [NSArray arrayWithObjects:(id)[UIColor colorWithRed: 0.0 green: 1.0 blue:0.0 alpha:1.0].CGColor, (id)[UIColor colorWithRed:0.0 green:0.9 blue:0.0 alpha:1.0].CGColor, nil];

    }
}

- (void)drawRect:(CGRect)rect
{
    [self drawRingInRect:rect thickness:thickness startAngle:0 endAngle:2 * M_PI colors:bgColors];
    
    [self drawRingInRect:rect thickness:thickness startAngle:M_PI / -2 endAngle:M_PI * (-0.5 + progress * 2) colors:[self getColorsForScore:score]];
}

@end
